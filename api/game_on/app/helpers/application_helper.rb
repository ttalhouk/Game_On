module ApplicationHelper

  def current_player
    if session[:id]
      @player = Player.find(session[:id])
    else
      nil
    end
  end

  def logged_in_user
    session[:id] || current_player
  end

  def player_team
    @player.teams.find(session[:team_id])
  end

  def is_manager?
    player_team.manager_id == current_player.id
  end
end
