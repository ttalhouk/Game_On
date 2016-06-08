# require 'sendgrid-ruby'

class Email

  def initialize
    @client = SendGrid::Client.new(api_key: ENV["GAME_ON_SENDGRID"])
  end

  def send_rsvp_email(team, game)
    players = team.players
    manager = Player.find(team.manager_id)
    players.each do |player|
      mail = SendGrid::Mail.new do |m|
        m.to = "#{player.email}"
        m.from = "#{manager.email}"
        m.subject = "RSVP for the #{team.name}\'s Next Game"
        m.html = "Hello #{player.name}, \n You have a pending RSVP for a game at #{game.start_time.strftime("%B, %eth, %I:%M %p")}. \n This will be at #{game.address}, #{game.city}, #{game.zip_code}.\n Sign in to your Game-On account to RSVP.  Once your team responds the game will be set up.  Remember it's first come first served so RSVP soon!"
      end
      res = @client.send(mail)
      puts res.code
      puts res.body
    end
  end

  def send_game_on_email(home_team, away_team, game)
    players = home_team.players.to_a.concat(away_team.players.to_a)
    players.each do |player|
      mail = SendGrid::Mail.new do |m|
        m.to = "#{player.email}"
        m.from = "no-reply@gameon.com"
        m.subject = "Game-On for the #{home_team.name} -vs- #{away_team.name}"
        m.html = "Hello #{player.name}, \n Game is On! The game is at #{game.start_time.strftime("%B, %eth, %I:%M %p")}. \n This will be at #{game.address}, #{game.city}, #{game.zip_code}."
      end
      res = @client.send(mail)
      puts res.code
      puts res.body
    end
  end
end
