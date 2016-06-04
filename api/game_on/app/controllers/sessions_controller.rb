class SessionsController < ApplicationController

  def new
  end

  def create
    @player = Player.find_by(email: params[:session][:username])
    if params [:session][:password] != nil
      if @player && @player.authenticate(params[:session][:password])
        session[:id] = @player.id
        # respond_to do |format|
        #   format.json {render json: response_hash}
        # end
        # send json info for next page
      end
      # send error message json

    end
  end

  def destroy
    unless !session[:id]
      reset_session
    end
    # info to pass?
  end

end
