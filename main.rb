require 'sinatra/base'
Dir['./lib/*.rb'].each { |f| require f }

class Main < Sinatra::Base

  def core
    data_coord = [
        [61.582195, -149.443512],
        [44.775211, -68.774184],
        [25.891297, -97.393349],
        [45.787839, -108.502110],
        [35.109937, -89.959983],
    ]

    white_house = Address.new
    white_house_coordinates = white_house.getLocation('1600 Pennsylvania Avenue NW Washington, D.C. 20500');

    @data = data_coord.map{|coord|
      address = Address.new
      address.getLocation(coord)
      street = address.getStreet(coord)
      distance_to = address.miles_to(white_house_coordinates)
      {coordinates: coord, street_address: street, distance_wh: distance_to}
    }
  end

  get '/' do
    core
    erb :index , locals: { address: @data }
  end

end
