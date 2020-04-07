class Item < ApplicationRecord
  belongs_to :location
  has_many :photos
  has_many :receipts
  has_many :files
end
