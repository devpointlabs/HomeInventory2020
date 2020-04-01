class CreateReceipts < ActiveRecord::Migration[6.0]
  def change
    create_table :receipts do |t|
      t.date :date
      t.string :receipt_num
      t.string :purchased_from
      t.float :price
      t.float :tax
      t.string :img
      t.belongs_to :item, null: false, foreign_key: true

      t.timestamps
    end
  end
end
