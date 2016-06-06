class TeamsController < ApplicationController

  def index
    p params
    @player = Player.find(params[:id])
    @teams = @player.teams
    @sports = Sport.all
    response_hash = {player:
      {
      info: @player.as_json,
      team: players_team.as_json,
      sport: @sports.as_json
      }
    }

    render json: response_hash

  end

  def show
    if current_player.teams.include?(@team)
      #render json info for team page
    else
      redirect #somewhere
    end

  end

  def new
    @team = Team.new
  end

  def create #using it
    p params
    @player = Player.find(params[:player_id].to_i)
    @team = @player.teams.new(
      name: params[:team][:name],
      sport_id: 1,
      zip_code: params[:team][:zip_code].to_i,
      city: params[:team][:city],
      manager_id: @player.id
      )
    if @team.save
      @player.teams << @team
      response_hash={player:{info: @player.as_json, teams: @player.teams.as_json}}
      p "*************************************************"
      p response_hash
      p "*************************************************"
      render json: response_hash
    else
      response_hash = {error: true, errorMessages: @team.errors.full_messages.join(" | ")}
      render json: response_hash, :status => 422
    end
  end

  def edit
    unless is_manager?
      #redirect somewhere
    end
  end

  def update
    @team = current_player.teams.new(team_params)

    @team.manager_id = current_player.id
    if @team.save
      # send json info
    else
      # send errors in json
    end

  end

  private

    def team_params
      params.require(:team).permit(:name, :sport, :city, :zip_code)
    end

    def players_team
      @player.teams
    end

end
