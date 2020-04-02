class Api::DocumentsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_item 

  def index
    render json: @item.documents
  end 

  def show
    render json: @items.documents.find(params[:id])
  end

  def create
    document = @item.documents.new(photo_params)
    if document.save
      render json: document
    else
      render json: {message: "ooopsie"}
    end
  end

  def update
    if @document.update(docoument_params)
      render json: @document
    else
      render json:{message: 'ooopsie'}
    end
  end

  def destroy
    @document.destroy
  end

  private 

  def document_params
    params.require(:documents).permit(:name, :file, :doc_type)
  end

  def set_item
    @item = Item.find(params[:item_id])
  end
end