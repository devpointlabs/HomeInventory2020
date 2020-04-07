class Api::MaintenancesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_home
  before_action :set_maintenance, only: [:show, :edit, :destroy]

  def index
    maintenances = @home.maintenances.all
    render json: maintenances
  end

  def show
    maintenance = @home.maintenances.find(params[:id])
    render json: maintenance
  end

  def create
    maintenance = @home.maintenances.new(maintenance_params)
    if maintenance.save
      render json: maintenance
    else
      render json: maintenance.errors, status: 422
    end
  end
 
  def update
    @maintenance.update(maintenance_params)
    render json: @maintenance
  end

  def destroy
    @maintenance.destroy
    render json: { message: 'Maintenance deleted.' }
  end

private

  def maintenance_params
    params.permit(:due_date, :task)
  end

  def set_home
    @home = Home.find(params[:home_id])
  end
  def set_maintenance
    @maintenance = @home.maintenances.find(params[:id])
  end
end
