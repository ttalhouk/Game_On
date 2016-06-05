class GamesController < ApplicationController
  before_action :set_player, only: [:index, :new]
  def index
    p params
    teams = @player.teams
    games = all_games
      response_hash = {
          player:{
          info: @player.as_json,
          teams: teams.as_json,
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
  end

  def update

  end

  private

  def set_player
    @player = Player.find(params[:player_id])
  end

  def find_managed_teams(player)
    player.teams.find_by(manager_id: player_id)
  end

  def all_games
    @games = []
    @games << @player.home_games.where(["start_time > ?", Time.now])
    @games << @player.away_games.where(["start_time > ?", Time.now])
    @games.flatten!.map do |game|
      {
        home_team: Team.find(game.home_team_id).name,
        away_team: Team.find(game.away_team_id).name,
        address: game.address,
        zip_code: game.zip_code,
        city: game.city,
        start_time: game.start_time.strftime('%I:%M %p %m/%d/%Y')
      }

    # @games.select! {|game| game.start_time > Time.now}

    end
  end
end
