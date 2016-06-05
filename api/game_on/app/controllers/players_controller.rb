class PlayersController < ApplicationController

  def show
    @player = Player.find(params[:id]) # will view pass this back?
  end

  def create
    params[:zip_code] = params[:zip_code].to_i
    p params
    @player = Player.new(player_params)
    @player.email.downcase!
    if @player.save
      p "info good"
      response_hash={player:{info: @player.as_json}}
      render json: response_hash
    else
      p "should be error"
      response_hash = {error: true, errorMessages: "Information Incomplete or Incorrect"}
      render json: response_hash, :status => 422
    end
  end


  def edit
    @player = Player.find(params[:id])
  end

  def update
    @player = Player.update(player_params)
    if @player.errors.empty?
      #pass json data
    else
      #pass errors back
    end
  end

  private

  def player_params
    params.require(:player).permit(:name, :email, :password, :city, :zip_code, :phone)
  end

end
