module RsvpMaker

  def self.make_rsvp(team, game)
    p team
    team.players.each do |player|
      Rsvp.create(
        game_id: game.id,
        team_id: team.id,
        player_id: player.id
      )
    end
    mgr_rsvp = Rsvp.find_by(game_id: game.id, team_id: team.id, player_id: team.manager_id)
    mgr_rsvp.update(responded: true)
  end

  def self.email_rsvp(team, game)
    # rsvp_email = Email.new
    # rsvp_email.send_rsvp_email(team, game)
  end

end
