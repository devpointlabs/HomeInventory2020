# frozen_string_literal: true

class User < ActiveRecord::Base
  extend Devise::Models
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  include DeviseTokenAuth::Concerns::User
  has_many :locations
<<<<<<< HEAD
  has_many :homes
=======
  has_one :homes
>>>>>>> a868fb865fe215e390618aa142968924d3044418
end
