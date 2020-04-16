class Api::PoliciesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_home
  before_action :set_policy, only: [:show, :edit, :destroy, :update]

  def index
    policies = @home.policies.all
    render json: policies
  end

  def show
    policy = @home.policies.find(params[:id])
    render json: policy
  end

  def create
    policy = @home.policies.new(policy_params)
    if policy.save
      render json: policy
    else
      render json: policy.errors, status: 422
    end
  end
 
  def update
    @policies.update(policies_params)
    render json: @policy
  end

  def destroy
    @policies.destroy
    render json: { message: 'Policy deleted.' }
  end

private

  def policy_params
    params.require(:policy).permit(:name, :issuer, :issue_date, :policy_num, :policy_type, :contact_info)
  end

  def set_home
    @home = Home.find(params[:home_id])
  end
  def set_policy
    @policy = @home.policies.find(params[:id])
  end
end
