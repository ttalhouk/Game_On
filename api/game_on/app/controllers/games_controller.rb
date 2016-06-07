class GamesController < ApplicationController
  require 'active_support'
  include GameUpdater
  include RsvpMaker

  before_action :set_player, only: [:index, :new, :create]

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

    # # format the time
    # time = Time.parse(params[:date].to_s).localtime("-07:00")
    # # or DateTime.parse(params[:date].to_s).localtime("-07:00")
    # # time = Time.now + 5.days

    @team = Team.find(params[:team_id])
    @game = GameUpdater.setup_game_info(params, @team)
    GameUpdater.remove_old_games
    if @game.save
      RsvpMaker.make_rsvp(@team, @game)
      RsvpMaker.email_rsvp(@team, @game)

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
    GameUpdater.remove_old_games #not tested
    @games = @team.home_games.to_a.reject!{|game| game.away_team_id == nil}
    @games.concat(@team.away_games.to_a)
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
end
