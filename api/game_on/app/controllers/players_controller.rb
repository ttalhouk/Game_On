class PlayersController < ApplicationController

  def show
    @player = Player.find(params[:id]) # will view pass this back?
  end

  def create
    params[:zip_code] = params[:zip_code].to_i
    @player = Player.new(player_params)
    @player.email.downcase!
    if @player.save
      response_hash={player:{info: @player.as_json}}
      render json: response_hash
    else
      response_hash = {error: true, errorMessages: "Information Incomplete or Incorrect"}
      render json: response_hash, :status => 422
    end
  end


  def edit
    @player = Player.find(params[:id])
  end

  def update
    params[:zip_code] = params[:zip_code].to_i
    params[:email] = params[:eamil].downcase
    @player = Player.update(player_params)
    if @player.errors.empty?
      response_hash={player:{info: @player.as_json}}
      render json: response_hash
    else
      response_hash = {error: true, errorMessages: "Information Incomplete or Incorrect"}
      render json: response_hash, :status => 422
    end
  end

  private

  def player_params
    params.require(:player).permit(:name, :email, :password, :city, :zip_code, :phone)
  end

end
