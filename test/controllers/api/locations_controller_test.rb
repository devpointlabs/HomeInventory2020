require 'test_helper'

class Api::LocationsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_locations_index_url
    assert_response :success
  end

  test "should get create" do
    get api_locations_create_url
    assert_response :success
  end

  test "should get edit" do
    get api_locations_edit_url
    assert_response :success
  end

  test "should get destroy" do
    get api_locations_destroy_url
    assert_response :success
  end

end
