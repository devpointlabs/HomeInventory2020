class CreateItems < ActiveRecord::Migration[6.0]
  def change
    create_table :items do |t|
      t.string :name
      t.string :make
      t.string :model
      t.string :serial_num
      t.string :category
      t.string :collection
      t.string :condition
      t.string :heir
      t.date :purchase_date
      t.integer :quantity
      t.float :value
      t.string :tags
      t.belongs_to :location, null: false, foreign_key: true

      t.timestamps
    end
  end
end
