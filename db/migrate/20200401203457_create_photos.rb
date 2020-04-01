class CreatePhotos < ActiveRecord::Migration[6.0]
  def change
    create_table :photos do |t|
      t.string :name
      t.string :file
      t.belongs_to :item, null: false, foreign_key: true
      t.date :date

      t.timestamps
    end
  end
end
