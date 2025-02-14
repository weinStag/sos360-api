import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { Query } from '@nestjs/graphql';
import { CustomLogger } from 'src/logger/custom.logger';
import { Status } from '@prisma/client';
import { Urgencyrepository } from './repository/urgency.repository';
import { urgencySchema } from './schema/urgency.schema';

@Resolver()
export class UrgencyResolver {
  constructor(
    private UrgencyRepository: Urgencyrepository,
    private logger: CustomLogger,
  ) { }

  @Query(() => [urgencySchema])
  async urgencies() {
    this.logger.log('Received request to find all urgencies')
    try {
      const urgencies = await this.UrgencyRepository.findAllurgencies();
      this.logger.log(`Fetched ${urgencies.length} urgencies`);

      return urgencies;
    } catch (error) {
      this.logger.error('Error fetching all urgencies');
      throw error;
    }
  }

  @Query(() => [urgencySchema])
  async findUrgenciesByStatus(@Args(`status`) status: Status) {
    try {
      const allUrgencies = await this.UrgencyRepository.findAllurgencies();
      return allUrgencies.filter((urgency) => urgency.status == status);
    }catch(error) {
      return error;
    }
  }

  @Query(() => urgencySchema)
  async findUrgencyById(@Args('id') id: string) {
    this.logger.log('Received request to find a urgency by Id')
    try {
      const urgency = await this.UrgencyRepository.findUrgencyById(id);
      this.logger.log(`Urgency with id ${urgency.id}`);

      return urgency;
    } catch (error) {
      this.logger.error('Error fetching urgency by id');
      throw error;
    }
  }

  @Mutation(() => urgencySchema)
  async createEmergency(@Args('urgency') urgency: urgencySchema) {
    this.logger.log('Received request to create a new urgency');
    try {
      const newUrgency = await this.UrgencyRepository.addUrgency(urgency);
      this.logger.log('Urgency created.');

      return newUrgency;
    } catch (error) {
      this.logger.error('Error creating a new urgency');
      throw error;
    }
  }

  @Mutation(() => urgencySchema)
  async removeEmergencyById(@Args('id') id: string) {
    this.logger.log('Received request to remove a urgency by id');
    try {
      const urgency = await this.UrgencyRepository.removeUrgencyById(id);
      this.logger.log(`Urgency with id ${urgency.id} removed sucessfully.`);

      return urgency;
    } catch (error) {
      this.logger.error('Error removing urgency by id');
      throw error;
    }
  }

    @Mutation(() => urgencySchema)
    async updateUrgencyStatus(
      @Args('id') id: string,
      @Args('status', { type: () => Status }) status: Status
    ) {
      this.logger.log(`Received request to update status of emergency ${id} to ${status}`);
      try {
        const updatedUrgency = await this.UrgencyRepository.updateUrgencyStatus(id, status);
        this.logger.log(`Updated emergency ${id} status to ${status}`);
        return updatedUrgency;
      } catch (error) {
        this.logger.error(`Error updating status for emergency ${id}`);
        throw error;
      }
    }


}
