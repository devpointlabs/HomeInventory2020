# t.string "name"
# t.integer "square_footage"
# t.text "description"
# t.bigint "user_id", null: false
## _________________________ CREATE LOCATIONS ___________________________________
# Location.create(name: "Garage", square_footage: 360, description: "This is a description of this room.", user_id: 1)
# Location.create(name: "Living Room", square_footage: 120, description: "This is a description of this room.", user_id: 1)
# Location.create(name: "Master Bedroom", square_footage: 90, description: "This is a description of this room.", user_id: 1)
# Location.create(name: "Dining Room", square_footage: 100, description: "This is a description of this room.", user_id: 1)
# Location.create(name: "Storage / Basement", square_footage: 600, description: "This is a description of this room.", user_id: 1)

# # Location.create(name: "Dining Room", square_footage: 80, description: "This is a description of this room.", user_id: 1)
# # Location.create(name: "Living Room", square_footage: 120, description: "This is a description of this room.", user_id: 1)
# # Location.create(name: "Master BR", square_footage: 100, description: "This is a description of this room.", user_id: 1)

# puts "Locations seeded."

# Item.create(name: 'Car', make: 'Toyota', model: 'Landcruiser 70', serial_num: '123456', category: 'Auto', 
#   collection: 'Highest Importance', condition: 'immaculate', quantity: 1, value: 35000.00, location_id: 1, user_id: 1)
# Item.create(name: 'Sofa', make: 'Goodsofa, Inc.', model: 'CloudSeat 6000', serial_num: '123456', category: 'Furniture', 
#   collection: 'Comfort', condition: 'used', quantity: 1, value: 600.00, location_id: 2, user_id: 1)
# Item.create(name: 'TV', make: 'Samsung', model: 'S600', serial_num: '123456', category: 'Electronics', 
#   collection: 'Electronics', condition: 'Good', quantity: 1, value: 800.00, location_id: 2, user_id: 1)

  ## _________________________ CREATE HOME ___________________________________
  Home.create(address: "1234 Main Street Salt Lake City, Utah", zip_code: 84111, square_footage: 2500, lot_size: 0.08, purchase_date: "Jan 1, 2020",purchase_price: 1000000.00, image: 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', user_id: 1)
  puts "House seeded."

  # assessments
  # t.date "date"
  # t.float "land_value"
  # t.float "structure_value"
  # t.float "total_value"
  # t.bigint "home_id", null: false

 
  Assessment.create(date: '01/01/01', land_value: 41000.00, structure_value: 100000.00, total_value: 100000.00, home_id: 1 )
  Assessment.create(date: '02/02/02', land_value: 51000.00, structure_value: 200000.00, total_value: 200000.00, home_id: 1 )
  Assessment.create(date: '03/03/03', land_value: 61000.00, structure_value: 300000.00, total_value: 300000.00, home_id: 1 )
  # maintenances
  # t.date "due_date"
  # t.string "task"

  Maintenance.create(due_date: '01/01/01', task: 'Change Heating Filter', home_id: 1)
  Maintenance.create(due_date: '02/02/02', task: 'Fix Door', home_id: 1)
  Maintenance.create(due_date: '03/03/03', task: 'Change Dog', home_id: 1)
  
puts "Items seeded."
  