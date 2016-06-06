class RsvpsController < ApplicationController
  def show
    @player = Player.find(params[:player_id])
    @team = Team.find(params[:team_id])
    @game = Game.find(params[:game_id])
    @rsvp = Rsvp.find_by(
      player_id:@player.id,
      team_id:@team.id,
      game_id:@game.id
    )
    @rsvp.update(responded: true)
    responses = Rsvp.where(["team_id = ? AND game_id = ? AND responded = ?", @team.id, @game.id, true]).count
    if responses <= @game.team_size
      @game.update(home_team_id: @team.id)
      remove_invites
    end
  end

  def create

  end

  def update
  end

  private

  def remove_invites
    team_confirmed = Rsvp.where(["team_id = ? AND game_id = ?", @team.id, @game.id])
    team_confirmed.each {|invite| invite.destroy }

  end
end
