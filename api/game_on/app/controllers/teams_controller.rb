class TeamsController < ApplicationController
  before_action :set_team, only: [:show, :edit, :update, :destroy]

  def index
    # for searching for team to join need sport to find all teams by sport
    # potential for looking for team by location also
    @sport = Sport.find_by(sport: params[:sport]) #find sport selected
    @teams = Team.find_by(sport_id: @sport.id)
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

  def create
  #sport may need to be a hidden field to pass in to the params

    @team = current_player.teams.new(team_params)
    @team.manager_id = current_player.id
    if @team.save
      # send json info
    else
      # send errors in json
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

    def set_team
      @team = Team.find(params[:team_id])
    end

end
