class CreateHomes < ActiveRecord::Migration[6.0]
  def change
    create_table :homes do |t|
      t.string :address
      t.integer :zip_code
      t.integer :square_footage
      t.integer :lot_size
      t.date :purchase_date
      t.float :purchase_price
      t.string :image
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
