class Home < ApplicationRecord
  belongs_to :user
  has_many :assessments
  has_many :maintenances
  has_many :policies 
end
