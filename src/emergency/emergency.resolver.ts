import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { EmergencyRepository } from './repository/emergency.repository';
import { Query } from '@nestjs/graphql';
import { emergencySchema } from './schema/emergency.schema';
import { CustomLogger } from 'src/logger/custom.logger';
import { Status } from '@prisma/client';

@Resolver()
export class EmergencyResolver {
  constructor(
    private emergencyRepository: EmergencyRepository,
    private logger: CustomLogger,
  ) { }

  @Query(() => [emergencySchema])
  async emergencies() {
    this.logger.log('Received request to find all emergencies')
    try {
      const emergencies = await this.emergencyRepository.findAllEmergencies();
      this.logger.log(`Fetched ${emergencies.length} emergencies`);

      return emergencies;
    } catch (error) {
      this.logger.error('Error fetching all emergencies');
      throw error;
    }
  }

  @Query(() => [emergencySchema])
  async findEmergenciesByStatus(@Args(`status`) status: Status) {
    try {
      const allEmergencies = await this.emergencyRepository.findAllEmergencies();
      return allEmergencies.filter((emergency) => emergency.status == status);
    }catch(error) {
      return error;
    }
  }

  @Query(() => emergencySchema)
  async findEmergencyById(@Args('id') id: string) {
    this.logger.log('Received request to find a emergency by Id')
    try {
      const emergency = await this.emergencyRepository.findEmergencyById(id);
      this.logger.log(`Emergency with id ${emergency.id}`);

      return emergency;
    } catch (error) {
      this.logger.error('Error fetching emergency by id');
      throw error;
    }
  }

  @Mutation(() => emergencySchema)
  async createEmergency(@Args('emergency') emergency: emergencySchema) {
    this.logger.log('Received request to create a new emergency');
    try {
      const newEmergency = await this.emergencyRepository.addEmergency(emergency);
      this.logger.log('Emergency created.');

      return newEmergency;
    } catch (error) {
      this.logger.error('Error creating a new emergency');
      throw error;
    }
  }

  @Mutation(() => emergencySchema)
  async removeEmergencyById(@Args('id') id: string) {
    this.logger.log('Received request to remove a emergency by id');
    try {
      const emergency = await this.emergencyRepository.removeEmergencyById(id);
      this.logger.log(`Emergency with id ${emergency.id} removed sucessfully.`);

      return emergency;
    } catch (error) {
      this.logger.error('Error removing emergency by id');
      throw error;
    }
  }
}
