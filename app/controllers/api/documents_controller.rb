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
    file = params[:file]
    if file
      begin
        ext = File.extname(file.tempfile)
        cloud_image = Cloudinary::Uploader.upload(file, public_id: file.original_filename, secure: true, :resource_type => :raw)
        document = @item.documents.create(file: cloud_image['secure_url'], name: file.original_filename) 
        render json: document
      rescue => e
        render json: { errors: e }, status: 422
      end
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
    document = Document.find(params[:id])
    document.destroy
  end

  private 

  def document_params
    params.require(:documents).permit(:name, :file, :doc_type)
  end

  def set_item
    @item = Item.find(params[:item_id])
  end

end