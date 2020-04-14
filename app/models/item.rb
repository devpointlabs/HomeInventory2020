class Item < ApplicationRecord
  belongs_to :location
  belongs_to :user
  has_many :receipts, dependent: :destroy
  has_many :photos, dependent: :destroy
  has_many :documents, dependent: :destroy
end
