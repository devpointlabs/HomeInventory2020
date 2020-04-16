class CreatePolicies < ActiveRecord::Migration[6.0]
  def change
    create_table :policies do |t|
      t.string :name
      t.string :issuer
      t.date :issue_date
      t.string :policy_num
      t.string :policy_type
      t.text :contact_info
      t.belongs_to :home, null: false, foreign_key: true

      t.timestamps
    end
  end
end
