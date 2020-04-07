class CreateAssessments < ActiveRecord::Migration[6.0]
  def change
    create_table :assessments do |t|
      t.date :date
      t.float :land_value
      t.float :structure_value
      t.float :total_value
      t.belongs_to :home, null: false, foreign_key: true

      t.timestamps
    end
  end
end
