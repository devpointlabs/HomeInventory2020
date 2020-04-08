class Item < ApplicationRecord
  belongs_to :location
  belongs_to :user
  has_many :receipts 
  has_many :photos 
  has_many :documents
end
