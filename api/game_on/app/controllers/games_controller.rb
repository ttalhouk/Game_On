class GamesController < ApplicationController

  def index

  end

  def show

  end

  def new
    unless is_manager?
      #redirect somewhere
    end
  end

  def create

  end

  def update

  end

end
