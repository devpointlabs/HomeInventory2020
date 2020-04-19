# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_04_15_233036) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "assessments", force: :cascade do |t|
    t.date "date"
    t.float "land_value"
    t.float "structure_value"
    t.float "total_value"
    t.bigint "home_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["home_id"], name: "index_assessments_on_home_id"
  end

  create_table "documents", force: :cascade do |t|
    t.string "name"
    t.string "doc_type"
    t.string "file"
    t.bigint "item_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["item_id"], name: "index_documents_on_item_id"
  end

  create_table "homes", force: :cascade do |t|
    t.string "address"
    t.integer "zip_code"
    t.integer "square_footage"
    t.integer "lot_size"
    t.date "purchase_date"
    t.float "purchase_price"
    t.string "image"
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_homes_on_user_id"
  end

  create_table "items", force: :cascade do |t|
    t.string "name"
    t.string "make"
    t.string "model"
    t.string "serial_num"
    t.string "category"
    t.string "collection"
    t.string "condition"
    t.date "purchase_date"
    t.integer "quantity"
    t.float "value"
    t.string "tags"
    t.bigint "location_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "user_id"
    t.index ["location_id"], name: "index_items_on_location_id"
    t.index ["user_id"], name: "index_items_on_user_id"
  end

  create_table "locations", force: :cascade do |t|
    t.string "name"
    t.integer "square_footage"
    t.text "description"
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_locations_on_user_id"
  end

  create_table "maintenances", force: :cascade do |t|
    t.date "due_date"
    t.string "task"
    t.bigint "home_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["home_id"], name: "index_maintenances_on_home_id"
  end

  create_table "photos", force: :cascade do |t|
    t.string "name"
    t.string "file"
    t.bigint "item_id", null: false
    t.date "date"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["item_id"], name: "index_photos_on_item_id"
  end

  create_table "policies", force: :cascade do |t|
    t.string "name"
    t.string "issuer"
    t.date "issue_date"
    t.string "policy_num"
    t.string "policy_type"
    t.text "contact_info"
    t.string "policy_file"
    t.bigint "home_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["home_id"], name: "index_policies_on_home_id"
  end

  create_table "receipts", force: :cascade do |t|
    t.date "date"
    t.string "receipt_num"
    t.string "purchased_from"
    t.float "price"
    t.float "tax"
    t.string "img"
    t.bigint "item_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["item_id"], name: "index_receipts_on_item_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "provider", default: "email", null: false
    t.string "uid", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.boolean "allow_password_change", default: false
    t.datetime "remember_created_at"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.string "name"
    t.string "nickname"
    t.string "image"
    t.string "email"
    t.json "tokens"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "sign_in_count", default: 0
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true
  end

  add_foreign_key "assessments", "homes"
  add_foreign_key "documents", "items"
  add_foreign_key "homes", "users"
  add_foreign_key "items", "users"
  add_foreign_key "locations", "users"
  add_foreign_key "maintenances", "homes"
  add_foreign_key "photos", "items"
  add_foreign_key "policies", "homes"
  add_foreign_key "receipts", "items"
end
