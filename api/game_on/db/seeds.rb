require 'active_support'

Player.create(
  name: "bob",
  password: "123",
  email: "a@b.com",
  phone:"1234567890",
  zip_code: "94087",
  city: "sunnyvale")

Player.create(
  name: "jim",
  password: "123",
  email: "c@d.com",
  phone:"5555555555",
  zip_code: "94087",
  city: "sunnyvale")

Player.create(
  name: "Shaun",
  password: "123",
  email: "shaun@shaunsweet.com",
  phone:"1234567890",
  zip_code: "94087",
  city: "sunnyvale")

Player.create(
  name: "Talal",
  password: "123",
  email: "ttalhouk@gmail.com",
  phone:"5555555555",
  zip_code: "94087",
  city: "sunnyvale")

20.times do
  Player.create(
  name: Faker::Name.first_name,
  password: "123",
  email: Faker::Internet.email,
  phone:"(#{Faker::PhoneNumber.area_code}) #{Faker::PhoneNumber.exchange_code} - #{Faker::PhoneNumber.subscriber_number}",
  zip_code: [94101, 94105, 94110, 94115].sample,
  city: Faker::Address.city
  )
end

Sport.create(sport: "Basketball")
counter = 0
4.times do
  counter += 1
  Player.find(counter).teams.create(
    name: Faker::Team.creature,
    sport_id: 1,
    manager_id: counter,
    city:Faker::Address.city,
    zip_code: [94101, 94105, 94110, 94115].sample
    )
end

Player.all.each do |player|
  if player.teams == []
    player.teams << Team.all.sample
  end
end

15.times do
  Game.create(
    zip_code: [94101, 94105, 94110, 94115].sample,
    city: Faker::Address.city,
    team_size: rand(2..5),
    start_time: Time.now + rand(5..10).days,
    address:Faker::Address.street_address,
    )
end

Game.all.each do |game|
  random_id = rand(1..(Team.count - 1))
  game.update(
    home_team_id: random_id,
    away_team_id: random_id + 1
  )
end
