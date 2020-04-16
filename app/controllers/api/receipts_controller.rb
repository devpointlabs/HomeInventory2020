class Api::ReceiptsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_item
  before_action :set_receipt, only: [:show, :edit, :destroy]
  
  def index
    receipts = @item.receipts.all
    render json: receipts
  end

  def show
    render json: @receipt
  end

  def create
    receipt = @item.receipts.new(receipt_params)
    if receipt.save
     render json: receipt
    else
     render json: receipt.errors, status: 422
    end
  end

  def update
    @receipt.update(receipt_params)
    render json: @receipt
  end

  def destroy
    @receipt.destroy
    render json: { message: 'Receipt deleted.' }
  end

 private

  def receipt_params
    params.require(:receipt).permit(:date, :receipt_num, :purchase_from, :price, :tax, :image, :item_id)
  end

  def set_item
    @item = Item.find(params[:item_id])
  end
  
  def set_receipt
   @receipt = @item.receipts.find(params[:id])
  end
end