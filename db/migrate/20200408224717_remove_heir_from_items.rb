class RemoveHeirFromItems < ActiveRecord::Migration[6.0]
  def change
    remove_column :items, :heir
  end
end
