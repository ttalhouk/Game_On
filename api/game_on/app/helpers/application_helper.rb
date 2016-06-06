module ApplicationHelper

  def current_player
    if session[:id]
      @player = Player.find(session[:id])
    else
      nil
    end
  end

  def player_team
    @player.teams.find(session[:team_id])
  end

end
