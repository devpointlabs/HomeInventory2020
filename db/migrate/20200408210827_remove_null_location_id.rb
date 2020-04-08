class RemoveNullLocationId < ActiveRecord::Migration[6.0]
  def change
    change_column_null :items, :location_id, true
  end
end
