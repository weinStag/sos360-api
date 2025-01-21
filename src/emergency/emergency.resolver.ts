import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { EmergencyRepository } from './repository/emergency.repository';
import { Query } from '@nestjs/graphql';
import { emergencySchema } from './schema/emergency.schema';

@Resolver()
export class EmergencyResolver {
  constructor(private emergencyRepository: EmergencyRepository) {}

  @Query(() => [emergencySchema])
  async emergencies() {
    try {
      const emergencies = await this.emergencyRepository.findAllEmergencies();

      return emergencies;
    } catch (error) {
      throw error;
    }
  }

  @Query(() => emergencySchema)
  async findEmergencyById(@Args('id') id: string) {
    try {
      const emergency = await this.emergencyRepository.findEmergencyById(id);

      return emergency;
    } catch (error) {
      throw error;
    }
  }

  @Mutation(() => emergencySchema)
  async createEmergency(@Args('emergency') emergency: emergencySchema) {
    try {
      const newEmergency = await this.emergencyRepository.addEmergency(emergency);

      return newEmergency;
    } catch (error) {
      throw error;
    }
  }

  @Mutation(() => emergencySchema)
  async removeEmergencyById(@Args('id') id: string) {
    try {
      const emergency = await this.emergencyRepository.removeEmergencyById(id);

      return emergency;
    } catch (error) {
      throw error;
    }
  }
}
