module GameUpdater

  def self.remove_old_games
    p "I'm removing old games"
    Game.where("start_time < ?", Time.now).each {|game| game.destroy}
    #   # could use .past?
    #   # old_games = Game.all.keep_if {|game| game.past? }
    #   # old_games.each { |game| game.destroy }
  end

  def self.setup_game_info(params, team)
    time = Time.parse(params[:date].to_s).localtime("-07:00")

    Game.new(
      start_time: DateTime.parse(time.to_s),
      address: params[:address],
      city: params[:city],
      team_size: 5,
      zip_code: params[:zip_code].to_i
    )
  end

  def self.add_team_to_game(game, team)
      if game.home_team_id.nil?
        game.update(home_team_id: team.id)
      elsif game.away_team_id.nil?
        game.update(away_team_id: team.id)
        # email = Email.new
        # email.send_game_on_email(game.home_team,game.away_team, game)
      end
  end
end
