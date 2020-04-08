class Location < ApplicationRecord
  belongs_to :user
  has_many :items, optional: true
end
