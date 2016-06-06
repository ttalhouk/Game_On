class RsvpsController < ApplicationController
  def index
    @player = Player.find(params[:player_id])
    @rsvps = Rsvp.where(["player_id = ? AND responded = ?",@player.id, false])
    response_hash = {player:
      {
        info: @player.as_json,
        open_rsvp: @rsvps.as_json
      }
    }
    render json: response_hash
  end

  def update
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
      if @game.home_team_id.nil?
        @game.update(home_team_id: @team.id)
      elsif @game.away_team_id.nil?
        @game.update(away_team_id: @team.id)
      end
      remove_invites
    end
  end

  private

  def remove_invites
    team_confirmed = Rsvp.where(["game_id = ?", @game.id])
    team_confirmed.each {|invite| invite.destroy }
  end
end
