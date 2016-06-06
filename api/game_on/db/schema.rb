# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160604032809) do

  create_table "games", force: :cascade do |t|
    t.datetime "start_time"
    t.string   "address"
    t.string   "city"
    t.integer  "zip_code"
    t.integer  "team_size"
    t.integer  "home_team_id"
    t.integer  "away_team_id"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  create_table "games_teams", force: :cascade do |t|
    t.integer  "away_team_id"
    t.integer  "home_team_id"
    t.integer  "game_id"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  add_index "games_teams", ["away_team_id"], name: "index_games_teams_on_away_team_id"
  add_index "games_teams", ["game_id"], name: "index_games_teams_on_game_id"
  add_index "games_teams", ["home_team_id"], name: "index_games_teams_on_home_team_id"

  create_table "players", force: :cascade do |t|
    t.string   "name"
    t.string   "password_digest"
    t.string   "email"
    t.string   "phone"
    t.integer  "zip_code"
    t.string   "city"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  create_table "players_teams", force: :cascade do |t|
    t.integer  "team_id"
    t.integer  "player_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "rsvps", force: :cascade do |t|
    t.integer  "game_id"
    t.integer  "team_id"
    t.integer  "player_id"
    t.boolean  "responded",  default: false
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
  end

  add_index "rsvps", ["game_id"], name: "index_rsvps_on_game_id"
  add_index "rsvps", ["player_id"], name: "index_rsvps_on_player_id"
  add_index "rsvps", ["team_id"], name: "index_rsvps_on_team_id"

  create_table "sports", force: :cascade do |t|
    t.string   "sport"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "teams", force: :cascade do |t|
    t.string   "name"
    t.integer  "sport_id"
    t.string   "chat_id"
    t.integer  "manager_id"
    t.string   "city"
    t.integer  "zip_code"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "teams", ["manager_id"], name: "index_teams_on_manager_id"
  add_index "teams", ["sport_id"], name: "index_teams_on_sport_id"

end
