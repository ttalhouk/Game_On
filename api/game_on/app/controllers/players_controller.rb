class PlayersController < ApplicationController

  def new
    @Player.new
  end

  def show
    @player = Player.find(params[:id]) # will view pass this back?
  end

  def create
    @player = Player.new(player_params)
    @player.email.downcase!
    if @player.save
      session[:id] = @player.id

      #pass json data
    else

      #pass errors back
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
