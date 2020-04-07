# t.string "name"
# t.integer "square_footage"
# t.text "description"
# t.bigint "user_id", null: false
## _________________________ CREATE LOCATIONS ___________________________________
Location.create(name: "Garage", square_footage: 360, description: "This is a description of this room.", user_id: 1)
Location.create(name: "Living Room", square_footage: 120, description: "This is a description of this room.", user_id: 1)
Location.create(name: "Master Bedroom", square_footage: 90, description: "This is a description of this room.", user_id: 1)
Location.create(name: "Dining Room", square_footage: 100, description: "This is a description of this room.", user_id: 1)
Location.create(name: "Storage / Basement", square_footage: 600, description: "This is a description of this room.", user_id: 1)

# Location.create(name: "Dining Room", square_footage: 80, description: "This is a description of this room.", user_id: 1)
# Location.create(name: "Living Room", square_footage: 120, description: "This is a description of this room.", user_id: 1)
# Location.create(name: "Master BR", square_footage: 100, description: "This is a description of this room.", user_id: 1)

puts "Locations seeded."

Item.create(name: 'Car', make: 'Toyota', model: 'Landcruiser 70', serial_num: '123456', category: 'Auto', 
  collection: 'Highest Importance', condition: 'immaculate', heir: 'Good Child', 
  quantity: 1, value: 35000.00, location_id: 1)
Item.create(name: 'Sofa', make: 'Goodsofa, Inc.', model: 'CloudSeat 6000', serial_num: '123456', category: 'Furniture', 
  collection: 'Comfort', condition: 'used', heir: 'The Dog', 
  quantity: 1, value: 600.00, location_id: 2)
Item.create(name: 'TV', make: 'Samsung', model: 'S600', serial_num: '123456', category: 'Electronics', 
  collection: 'Electronics', condition: 'Good', heir: 'The Cat', 
  quantity: 1, value: 800.00, location_id: 2)

## _________________________ CREATE HOME ___________________________________

puts "Items seeded."
  