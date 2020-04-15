class Api::AssessmentsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_home
  before_action :set_assessment, only: [:show, :edit, :destroy, :update]

  def index
    assessments = @home.assessments.all
    render json: assessments
  end

  def show
    assessment = @home.assessments.find(params[:id])
    render json: assessment
  end

  def create
    assessment = @home.assessments.new(assessment_params)
    if assessment.save
      render json: assessment
    else
      render json: assessment.errors, status: 422
    end
  end
 
  def update
    @assessment.update(assessment_params)
    render json: @assessment
  end

  def destroy
    @assessment.destroy
    render json: { message: 'Assessment deleted.' }
  end

private

  def assessment_params
    params.permit(:date, :land_value, :structure_value, :total_value)
  end

  def set_home
    @home = Home.find(params[:home_id])
  end
  def set_assessment
    @assessment = @home.assessments.find(params[:id])
  end
end
