class TeamsController < ApplicationController
  before_action :set_player, only: [:index, :show, :create, :join, :update]
  before_action :set_team, only: [:show, :join, :update]

  def index
    p params
    @sports = Sport.all
    response_hash = {
      player:{
        info: @player.as_json,
        team: players_team.as_json,
        sport: @sports.as_json
      }
    }

    render json: response_hash

  end

  def show

    response_hash{
      player:{
        info: @player.as_json,
        team: @team.as_json,
        isManger: @team.manager_id == @player.id
      }
    }
    render json: response_hash
  end

  def new
    @team = Team.new
  end

  def create #using it
    p params
    # @player = Player.find(params[:player_id].to_i)
    @team = @player.teams.new(
      name: params[:team][:name],
      sport_id: 1, #to implement for multiple sports
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
    p params
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
    p params
    # @player = Player.find(params[:player_id])
    # @team = Team.find(params[:team_id])
    @player.teams << @team

    response_hash = {
      player:{
        info:@player.as_json,
        team: @player.teams.as_json
      }
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
      @team = Team.find(params[:team_id].to_i)
    end

    def team_params
      params.require(:team).permit(:name, :sport, :city, :zip_code)
    end

    def players_team
      @player.teams
    end

end
