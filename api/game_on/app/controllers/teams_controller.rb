class TeamsController < ApplicationController
  before_action :set_player, only: [:index, :show, :create, :join, :drop, :update]
  before_action :set_team, only: [:show, :update]

  def index
    p params
    @sports = Sport.all
    @teams = Team.all.reject{|team| @player.teams.include?(team)}
    p @teams
    response_hash = {team: @teams.as_json}
    render json: response_hash
  end

  def play
    @team = Team.find(params[:team_id])
    @games = find_available_games
    response_hash = {
      team: @team.as_json,
      games: @games.as_json
    }
    render json: response_hash
  end

  def show
    response_hash = {
      player:{
        info: @player.as_json,
        team: @team.as_json,
        isManager: @team.manager_id == @player.id,
        roster: @team.players.map {|player| player.name },
        manager: Player.find(@team.manager_id)
      }
    }
    p response_hash
    render json: response_hash
  end

  def new
    @team = Team.new
  end

  def create
    @team = @player.teams.new(
      name: params[:team][:name],
      sport_id: 1, #to implement for multiple sports
      zip_code: params[:team][:zip_code].to_i,
      city: params[:team][:city],
      manager_id: @player.id
      )
    if @team.save
      @player.teams << @team
      response_hash = {
        player:{
          info: @player.as_json,
          team: @player.teams.as_json
        }
      }
      render json: response_hash
    else
      response_hash = {error: true, errorMessages: @team.errors.full_messages.join(" | ")}
      render json: response_hash, :status => 422
    end
  end

  def edit
    response_hash = {
      player:{
        info: @player.as_json,
        team: @team.as_json,
        isManger: @team.manager_id == @player.id
      }
    }
    render json: response_hash
  end

  def join
    @team = Team.find(params[:team_id])
    @player.teams << @team
    response_hash = {
      player:{
        info:@player.as_json,
        team: @player.teams.as_json
      }
    }
    render json: response_hash
  end

  def drop
    @player.teams.delete(@team)
    response_hash = {
      info:@player.as_json,
      team: @player.teams.as_json
    }
    render json: response_hash
  end

  def update
    @team = @player.teams.update(
      name: params[:team][:name],
      sport_id: 1, #to implement for multiple sports
      zip_code: params[:team][:zip_code].to_i,
      city: params[:team][:city],
    )
  end

  private

  def set_player
    @player = Player.find(params[:player_id].to_i)
  end
  def set_team

    @team = Team.find(params[:id].to_i)
  end

  def team_params
    params.require(:team).permit(:name, :sport, :city, :zip_code)
  end

  def players_team
    @player.teams
  end

  def find_available_games
    games_info = []
    games = Game.where("home_team_id IS NOT NULL AND home_team_id <> ? AND away_team_id IS NULL", @team.id)
    games.each do |game|
      games_info << {
        game_id: game.id,
        start_time: game.start_time.strftime('%I:%M %p %m/%d/%Y'),
        address: game.address,
        city: game.city,
        zip_code: game.zip_code,
        team_size: game.team_size,
        home_team: Team.find(game.home_team_id)
      }
    end
    return games_info

  end

end
