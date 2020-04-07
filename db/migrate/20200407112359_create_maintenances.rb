class CreateMaintenances < ActiveRecord::Migration[6.0]
  def change
    create_table :maintenances do |t|
      t.date :due_date
      t.string :task
      t.belongs_to :home, null: false, foreign_key: true

      t.timestamps
    end
  end
end
