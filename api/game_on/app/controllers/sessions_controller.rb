class SessionsController < ApplicationController

  def new
    response_hash={response:"your logging in"}
    render json: response_hash

  end

  def create
    p params
    p params[:email]
    @player = Player.find_by(email: params[:email].downcase)
    if @player && @player.authenticate(params[:password])
      p "should be valid"
      response_hash={player:{info: @player.as_json, teams: @player.teams.as_json}}
      render json: response_hash
    else
      p "should be error"
      response_hash = {error: true, errorMessages: ["Username or Password Incorrect"]}
      render json: response_hash, :status => 422
    end
  end

  def destroy
    unless !session[:id]
      reset_session
    end
    # info to pass?
  end

end
