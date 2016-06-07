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
    # or DateTime.parse(params[:date].to_s).localtime("-07:00")
    # time = Time.now + 5.days

    Game.new(
      start_time: DateTime.parse(time.to_s),
      address: params[:address],
      city: params[:city],
      team_size: 5,
      zip_code: params[:zip_code].to_i
    )
  end
end
