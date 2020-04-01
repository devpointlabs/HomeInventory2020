require 'test_helper'

class Api::DocumentsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_documents_index_url
    assert_response :success
  end

  test "should get create" do
    get api_documents_create_url
    assert_response :success
  end

  test "should get edit" do
    get api_documents_edit_url
    assert_response :success
  end

  test "should get destroy" do
    get api_documents_destroy_url
    assert_response :success
  end

end
