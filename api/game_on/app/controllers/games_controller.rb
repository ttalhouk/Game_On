class GamesController < ApplicationController
  require 'active_support'

  before_action :set_player, only: [:index, :new]

  def index
    # set up for one team per player.  Need to revisit for multiple teams.
    p params
    @team = Team.find(params[:team_id])
    p @team
    games = all_games
    response_hash = {
      player:{
        info: @player.as_json,
        team: @team.as_json,
        games: games.as_json
      }
    }

    p response_hash
    render json: response_hash
  end

  def show

  end

  def new
    teams = find_managed_teams(@player)
    response_hash = {
      player:{
        info: @player.as_json,
        managedTeams: teams.as_json
      }
    }
    render json: response_hash
  end




  def create
    p params
    # format the time
    time = Time.parse(params[:date].to_s).localtime("-07:00")
    # or DateTime.parse(params[:date].to_s).localtime("-07:00")
    # time = Time.now + 5.days

    @player = Player.find(params[:player_id])
    @team = Team.find(params[:team_id])
    @game =  Game.new(
      start_time: DateTime.parse(time.to_s),
      address: params[:address],
      city: params[:city],
      team_size: 5,
      zip_code: params[:zip_code].to_i
    )
    if @game.save
      @team.players.each do |player|
        Rsvp.create(
          game_id: @game.id,
          team_id: @team.id,
          player_id: player.id
        )
      end
      #rsvp_email = Email.new
      #rsvp_email.send_rsvp_email(@team, @game)
      response_hash = {player:{
        info: @player,
        team: @team
        }
      }
      render json: response_hash
    else
      response_hash = {error: true, errorMessages: @team.errors.full_messages.join(" | ")}
      render json: response_hash, :status => 422
    end
  end


  private

  def set_player
    @player = Player.find(params[:player_id])
  end

  def find_managed_teams(player)
    player.teams.find_by(manager_id: player_id)
  end

  def all_games

    p @team

    remove_old_games #not tested

    @games = Game.where("away_team_id IS NOT NULL AND start_time > ? AND away_team_id = ? OR home_team_id = ?", Time.now, @team.id, @team.id)

    @games.map do |game|
      {
        home_team: Team.find(game.home_team_id).name,
        away_team: Team.find(game.away_team_id).name,
        address: game.address,
        zip_code: game.zip_code,
        city: game.city,
        start_time: game.start_time.strftime('%I:%M %p %m/%d/%Y')
      }

    end
  end

  def remove_old_games
    Game.where("start_time < ?", Time.now).each {|game| game.destroy}
    # could use .past?
    # old_games = Game.all.keep_if {|game| game.past? }
    # old_games.each { |game| game.destroy }
  end
end
