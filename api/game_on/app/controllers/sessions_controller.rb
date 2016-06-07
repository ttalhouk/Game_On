class SessionsController < ApplicationController

  def create
    @player = Player.find_by(email: params[:email].downcase)
    if @player && @player.authenticate(params[:password])
      response_hash={player:{info: @player.as_json, team: @player.teams.as_json}}
      p "/" * 50
      p response_hash
      p "/" * 50
      render json: response_hash
    else
      p "should be error"
      response_hash = {error: true, errorMessages: "Username or Password Incorrect"}
      render json: response_hash, :status => 422
    end
  end


end
