class RemoveFkItemsLocations < ActiveRecord::Migration[6.0]

    def change
        remove_foreign_key :items, :locations
    end
end

